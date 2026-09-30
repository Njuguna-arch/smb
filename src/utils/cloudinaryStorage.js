export class CloudinaryStorage {
  constructor(opts) {
    if (!opts || !opts.cloudinary) {
      throw new Error("Cloudinary instance is required in options");
    }
    this.cloudinary = opts.cloudinary;
    this.params = opts.params || {};
  }

  async _handleFile(req, file, cb) {
    let called = false;
    const done = (err, info) => {
      if (called) return;
      called = true;
      cb(err, info);
    };

    try {
      let uploadOptions = {};
      if (typeof this.params === "function") {
        uploadOptions = (await this.params(req, file)) || {};
      } else {
        for (const [key, val] of Object.entries(this.params)) {
          const resolved = typeof val === "function" ? await val(req, file) : val;
          if (resolved !== undefined) {
            uploadOptions[key] = resolved;
          }
        }
      }

      const uploadStream = this.cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return done(error);
          done(null, {
            path: result.secure_url,
            size: result.bytes,
            filename: result.public_id,
            ...result,
          });
        }
      );

      file.stream.on("error", done);
      uploadStream.on("error", done);
      file.stream.pipe(uploadStream);
    } catch (err) {
      done(err);
    }
  }

  _removeFile(req, file, cb) {
    if (file && (file.filename || file.public_id)) {
      this.cloudinary.uploader.destroy(
        file.filename || file.public_id,
        { invalidate: true },
        cb || (() => {})
      );
    } else if (cb) {
      cb(null);
    }
  }
}

export default CloudinaryStorage;
