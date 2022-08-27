function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type File = {
  name: string;
  buffer: Buffer;
};

interface Uploader {
  upload(file: File): Promise<string>;
}

class S3Uploader implements Uploader {
  async upload(file: File): Promise<string> {
    // 75% chance of error
    if (Math.floor(Math.random() * 4) !== 0)
      throw new Error("erro ao fazer upload");
    return "fiz o upload corretamente";
  }
}

class ProxyS3Uploader implements Uploader {
  private readonly MAX_RETRIES = 3;
  private counter = 0;

  constructor(private uploader: Uploader) {}

  async upload(file: File): Promise<string> {
    try {
      return await this.uploader.upload(file);
    } catch (error) {
      if (this.counter >= this.MAX_RETRIES) throw error;

      this.counter++;
      console.log(
        `erro ao fazer upload, tentando novamente em 2 segundos (${this.counter}/${this.MAX_RETRIES})`
      );
      await sleep(2000);
      return await this.upload(file);
    }
  }
}

async function bootstrap() {
  // const uploader = new S3Uploader();
  const uploader = new ProxyS3Uploader(new S3Uploader());
  uploader
    .upload({ name: "file.txt", buffer: Buffer.from("hello world") })
    .then(console.log)
    .catch((error) => console.log("erro ao fazer upload", error));
}

bootstrap();
