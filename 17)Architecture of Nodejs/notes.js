/*
                           (written in js and c++)
=> Works on JS runtime and v8 engine(js code to machine language)

=> when we use javascript in browser we cannot use it to read/write in client's system due to security reasons that is where
LIBUV comes into action


(writen in c++)
LIBUV- open source library dealing with asynchronous input output
  |
  v
{event loop- easy tasks(ex: where callback func wait for execution and sending to main thread for execution)

thread loop - heavy/hard tasks(ex: reading a file or creating server)(we have 4 thread loops)
}
Main thread-- here generally output or calls of function or importing packages type tasks run

*/

/*
//Event loop


=> first all the callback functions in the queue are processed, unless all the events are processed the event loop does not enter the
next phase(callback functions of normal events expired timers).

=> In the 2nd phase the callback function of readfile and wriefile are processed(IO tasks).

=> In the 3rd phase the callback function of immediate events take place(Ex: SetImmediate())

=> In the last phase callback funtion of cloed events take place(Ex: socket.io('close',()=>{  }))

Disclaimer: 
=> In all these phases wherver a heavy task utters those events are sent to thread loop

Microtask and Nexttick queue

(If these queue's are present in a call back func of a particular phase)

They will be executed once the current phase is completed

Microtask queue- Stores a callback function of a reserved promise


Each loop after completion is termed as tick completed

*/

/*

Do's and Dont's

1. dont use sync in callback functions

2. Do not perform complex calculation inside callback function this blocks the main thread

3. Be careful with large JSON objects

4. Don't use complex regular expressions in callback funcitons

*/