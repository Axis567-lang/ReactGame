import React from 'react'
import Constants from '../Constants/Constants';

const randomPositions = (min, max) =>
{
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function (entities, { events, dispatch })
{
    const head = entities.head;
    const tail = entities.tail;
    const food = entities.food;

    if(events.length)
    {
      events.forEach( (e) => {
        switch(e){
          case "move-up":
            if (head.yspeed === 1) return;
            head.yspeed = -1;
            head.xspeed = 0;
            return;
          case "move-right":
            if(head.xspeed === -1) return;
            head.xspeed = 1;
            head.yspeed = 0;
            return;
          case "move-down":
            if (head.yspeed === -1) return;
            head.yspeed = 1;
            head.xspeed = 0;
            return;
          case "move-left":
            if(head.xspeed === 1) return;
            head.xspeed = -1;
            head.yspeed = 0;
            return;
          
        }
      });
    }

    head.nextMove -= 1;
    if(head.nextMove === 0)
    {
        head.nextMove = head.updateFrequency;

      if(
          head.position[0] + head.xspeed < 0 ||
          head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
          head.position[1] + head.yspeed < 0 ||
          head.position[1] + head.yspeed >= Constants.GRID_SIZE
        )
      {
        dispatch("game-over");
      }
      else
      {
        head.position[0] += head.xspeed;
        head.position[1] += head.yspeed;

        if(
          head.position[0] == food.position[0] &&
          head.position[1] == food.position[1]
        )
        {
          food.position = [
            randomPositions(0, Constants.GRID_SIZE - 1),
            randomPositions(0, Constants.GRID_SIZE - 1)
          ];
        }
      }
    }
    else
    {
      tail.elements = [[head.position[0], head.position[1]],...tail.elements];
      tail.elements.pop();

      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;

      tail.elements.forEach( (el, idx) => {
        if(
          head.position[0] === el[0] &&
          head.position[1] === el[1]
        ) dispatch("game-over");
      } );

      if(
        head.position[0] == food.position[0] &&
        head.position[1] == food.position[1]
      )
      {
        tail.elements = [
          [head.position[0], head.position[1]],
          ...tail.elements
        ];

        food.position = [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1)
        ]
      }
    }

  return entities;
}
