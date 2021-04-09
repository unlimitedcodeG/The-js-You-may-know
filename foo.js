import { hello } from "bar.js";

var hungry = 'hippo';

function awesome() {
    console.log(
        hello(hungry).toUpperCase()
    );
}

export awesome;