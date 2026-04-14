# 02-02 roebi game prototype with p5.js

# What is this about?

This is a story about create a html game prototype by using perplexity.ai as a programmer and p5.js as a JavaScript library for easy use of the Canvas API.

# the story

remark: chapter seven is learnings, if you would like to skip some chapters.

## chapter one - the beginning

There was this dream of creating a simple game based on HTML and making it available on the web.

Our resources are often not sufficient for this.

If you look at existing web games, it quickly becomes clear that a lot of graphics are required.

Yes there are open source game assets ...

If you look at existing web game frameworks, it quickly becomes clear that a lot of training time is needed to achieve minimal results.

Yes there are tutorials for it ...

If you want a result, then you have to reduce requirements ... , i.e. 2D graphics ant not 3D graphics.

looks, to project management: small Time, small Scope and Cost (What is it worth to you).

And some project managers add knowledge as a fourth dimension. (Do the tutorials)

and then comes the inner drive, do it

## chapter two - do it, minimal research first

how to start?

Now minimal research is necessary ...

Start with HTML technology: There are two of them to draw simple graphics, such as lines and texts.

one is the 'Canvas API' for 2D grapics

an other is 'WebGL' for 2D graphics and 3D grapics and use of hardware graphics acceleration

decision: use canvas api

next: is a framework or a JavaScript library needed.

the answer here is: it depends

decision: we start with a JavaScript library, a framework is too big

research: JavaScript library for Canvas API

there are some: p5.js , konva.js, d3.js, sprite.js, pixi.js, easel.js

look around by jourself, it is a matter of taste, and and a fit to your own previous experience

decision: i go for p5.js and yes there is a online editor see https://editor.p5js.org/roebigame/sketches

Don't be surprised that there is already code there. More on that later.

## chapter three - the basic idea

develop an easy-to-implement game idea with numbers

use zero graphics

use only basic drawing elements, e.g. text and lines

uses one of the available AI chats in the role of the software developer and explainer

I have taken on different roles:

game idea developer

requirement definer

Software developer to understand the evolving program

Software tester to test the evolving program

## chapter four - this ai thing

for this i decide to use perplexity.ai in a chat

i was use Visual Studio Code in a git project

### the Development cycle was following

(not optimal , i know now, but for this first thing it was working for me)

in the ai chat: ask about code in p5 js

copy the whole code answer into my evolving file sketch.js

from a certain size of the response, the entire code was no longer printed completely

and indeed there is a line limit of 357

from this point, i added 'show only the changed code'

This resulted in the ai ​​chat responses completely returning the changed functions.

them my copy work changed to: copy from the code answer the changed functions over the existing functions into my evolving file sketch.js

that works, but was not efficient

my thought on this: there are certainly better workflows

start the local webserver with start-http-server.bsh

open the browser with this localhost address

test the new 'functionality'

based on this

- ask for more code in the form of requirements
- ask for a fix of a bug, i.e. 'requirement x' does not work anymore, please fix

- optional correct your previous requirements if:
  - they were incorrect or incomplete
  - the ai-chat interpreted them unexpectedly

add the my ai-chat prompts into file llm-commands.txt

git commit the changes in sketch.js with llm-commands.txt

## chapter five - evolving requirements

in summary there are only 39 prompts

in summary at the end there was in sketch.js 415 lines.

### evolving requirements

layout

code in p5 js

add a grid with random numbers

score calculation

reuse existing function buttons with real used functions

add some layout : add some elements around the grid

add implement game mechanics, i.e. how to play with the game

restrict moves

add highscore (was later removed)

add rate the player's performance as a three stars rating

add a game level system: show all levels with its three stars in a own level page.

( I was impressed how this was understood and implemented )

determining the game flow between level side and game side

add more levels and introduction of 8 level groups (based on number of columns in the grid)

change level page to show only active level group

add a missing level group (change of a existing requirement)

## chapter six - result

the result is a functioning game prototype

see link below to play it

yes there are software errors

see it as a software tester to find out which ones are

my goals were fulfilled:

- creating a working game prototype

- publish a working game prototype

- first experience of how code can be generated and extended via an ai chat

- try a new development cycle by using an ai chat

## chapter seven - learnings

This Development cycle: Copying and pasting from ai chat to a file is not efficient

( I already know that there is something better, keyword aider.chat )

learn about ouptut limits

not tried here: creating automated software tests

This Development cycle: was only work with one source code file

This Development cycle: excludes version management (i.e. git)

## chapter eight - next steps

get experience with aider.chat

# Github Project

https://github.com/roebi/02-02-roebi-game-prototype-with-p5js

# LLM Commands used on perplexity.ai

https://github.com/roebi/02-02-roebi-game-prototype-with-p5js/blob/master/llm-commands.txt

# Link to the roebi game prototype

just one rule: higher is better

and press on 'Level 1-1' to start

and yes it is a 3-star Level Game

https://roebi.github.io/02-02-roebi-game-prototype-with-p5js/

# known bugs

there are some miner bugs, but try by yourself ...

see it as software testing
