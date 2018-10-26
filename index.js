var resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve('result of slow');
            console.log("slow promise is done");
        }, 2000);
    });
};

var resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve('result of fast');
            console.log("fast promise is done");
        }, 1000);
    });
};

var sequentialStart = async function () {
    console.log('==SEQUENTIAL START== with await');

    // If the value of the expression following the await operator is not a Promise, 
    // it's converted to a resolved Promise.  When you set a const to an await, it's the
    // same as when you resolve a value from a promise
    const slow = await resolveAfter2Seconds();
    const fast = await resolveAfter1Second();
    //So here we're logging out the resolved values
    console.log(slow);
    console.log(fast);
    // An async function returns a promise.  This func has no return value so that's just 
    // like doing resolve() from within a promise;
}

//fast finishes first but logging of slow is done first
var concurrentStart = async function () {
    console.log('==CONCURRENT START with await ==');
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Second();

    console.log(await slow);
    console.log(await fast); // waits for slow to finish, even though fast is already done!
}

// resolves of all promises end up in an array
var stillConcurrent = function () {
    console.log('==CONCURRENT START with Promise.all==');
    Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
        console.log(messages[0]); // slow
        console.log(messages[1]); // fast
    });
}

var parallel = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
}

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"
// wait above to finish
setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"
// wait again
setTimeout(stillConcurrent, 7000); // same as concurrentStart
// wait again
 setTimeout(parallel, 10000); // trully parallel: after 1 second, logs "fast", 
                             // then after 1 more second, "slow"
