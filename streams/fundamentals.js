// import process from 'node:process';
import { Readable, Writable, Transform } from 'node:stream';

// process.stdin.pipe(process.stdout);

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))

        this.push(buffer)
      }
    }, 100)
  }
}

class InverseNNumberStream extends Transform {
  _transform(chunk, _, callback) {
    const transformed = Number(chunk.toString()) * -1
    const buffer = Buffer.from(String(transformed))

    callback(null, buffer)
  }
}

class MultipleByTenStream extends Writable {
  _write(chunk, _, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNNumberStream())
  .pipe(new MultipleByTenStream())