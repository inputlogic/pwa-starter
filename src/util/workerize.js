// // Build a worker from an anonymous function body
// var blobURL = URL.createObjectURL( new Blob([ '(',

// function(){
//     //Long-running work here
// }.toString(),

// ')()' ], { type: 'application/javascript' } ) ),

// worker = new Worker( blobURL );

// // Won't be needing this anymore
// URL.revokeObjectURL( blobURL );

export default function workerize (name, ...args) {
  const worker = new window.Worker(`workers/${name}.js`)
  const promise = new Promise((resolve, reject) => {
    worker.onmessage = ev => resolve(ev.data)
    worker.postMessage({ args })
  })
  return { worker, promise }
}
