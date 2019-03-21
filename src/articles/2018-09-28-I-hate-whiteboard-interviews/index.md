---
path: /I-hate-whiteboard-interviews
date: 2018-09-28
title: I Hate Whiteboard Interviews
author: Nero Adaware
description: Experience in an interview and a dose of algorithm
---

I know the post’s title suggests a negative connotation but maybe after reading my story in this article you should learn something, but it’s equally okay if you pick nothing.

Last week I had an interview, let me quickly add; ( I am currently looking for a Front-end Developer role, remote or in Lagos, Nigeria)I had an interview with Interswitch, I was asked to come with writing materials because it was going to be a whiteboard test, more like white paper test because we did it on a white paper not board,
Let me also unashamedly admit that I’m not a fan of whiteboard tests so 2 week’s prior to the interview d I decided to practice at least one algorithm daily until the day of the interview.

![alt text](https://media.giphy.com/media/IPbS5R4fSUl5S/giphy.gif)

I mastered few algorithms and techniques for solving algorithms. Then came the day, I walked into the interswitch office feeling confident as hell knowing I could solve any algorithm thrown at me.

![alt text](https://media.giphy.com/media/ymQYKyz7STEwo/giphy.gif)

The time came

Question: Given two arrays, Array A and Array B put them in a new Array but there is a twist the zero index of Array A should be the zero index of the new Array, the last index of Array B should be the one index of the new Array, then the one index of the Array A should be two index of the new Array, the penultimate index of Array B should be the three index of the new array and so on until the new array contains array A and array B. You have only 15 minutes to provide a solution and don't use any special array method.

This diagram gives a visual explanation of the test
![alt text](http://i66.tinypic.com/iwq7q1.jpg)

When I first heard the question I was quite confident I could solve it but as you know being confident doesn't mean you are going to solve it. Long story short I failed the whiteboard test and I am still without job today. I spent the rest of that day, and the next three days thinking of how I was never going to be software developer. Well I was able to summon the courage to look at the question again and try to solve it, I came up with a solution with help from my friend [@debugmonstar](https://twitter.com/debugMonstar).

```javascript
function interweave(array1, array2) {
  let newArray = []
  let longestArray = array1.length > array2.length ? array1 : array2
  let reverseArray = array2.reverse()

  for (let i = 0; i < longestArray.length; i++) {
    if (array1[i] || array1[i] === 0) {
      newArray[newArray.length] = array1[i]
    }
    if (array2[i] || array2[i] === 0) {
      newArray[newArray.length] = array2[i]
    }
  }

  return newArray
}
let arrayA = [5, 7, 9, 2, 6, 1, 4, 0, 3]
let arrayB = [12, 3, 8, 1, 6]

let output = interweave(arrayA, arrayB)
console.log(output) //returns [5,6,7,1,9,8,2,3,6,12,1,4,0,3]
```

- First we declare a new array called newArray.

- Then we find the longer array between array1 and array2 so that we can know the maximum amount of times to iterate through to give us the new array.

- Then reverse the array2 because it makes it easier to insert it into the new array.

- We then start our iteration, first we check if index (i) exists in array1 or index i of array1 is equal to zero,if so we add it to the newArray then we do the same check for array2 then add it newArray and it continues until the iteration ends.

- Then return our newArray.

One problem I struggled with when I was given this question during the interview was that I could not gather my thoughts quickly, different ideas were flying through my head and before I could put pen to paper to 15 minutes was over, So my advice for my future self and other people like me that have to deal with whiteboard test are:

- First, stay calm because the question may look tricky initially, but it might be something you can easily achieve,maybe even in less than 10 lines of code.

- Don't just jump into the code and start writing, first critically think about what the final result is going to be and how you can achieve it.

* Finally failing a whiteboard test doesn't mean you are a failure or you are a trash programmer.

https://twitter.com/iamdevloper/status/1044905355933876225

If you read this up to this point, I am glad the title didn't put you off and hopefully you learnt something. Also,. if you have a different or more elegant solution simply share by kindly writing it in the comment section.

---

**Special Thanks to my friend [Yinka Yomi-Joseph](https://twitter.com/YJTheRuler) for helping me edit this Article**
