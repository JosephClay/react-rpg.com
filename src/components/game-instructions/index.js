import React from 'react';

import Button        from '../button';
import Dialog        from '../dialog';
import items         from '../../data/items';
import maps          from '../../data/maps';
import store         from '../../config/store';
import { START_MAP } from '../../config/constants';

import ArrowKeys from './assets/arrow-keys.png';
import DoubleTap from './assets/double-tap.png';
import Enter     from './assets/enter.png';
import Space     from './assets/space.png';
import Swipe     from './assets/swipe.png';
import WASDKeys  from './assets/wasd-keys.png';

import './styles.scss';

const GameInstructions = (props) => {

  function handleShowMapMessage() {
    const { message } = maps[START_MAP];

    store.dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameText: {
          title: message.title,
          body: message.body
        }
      }
    });
  }

  function handleLoadStartingItems() {
    // give the player a rusty sword
    store.dispatch({
      type: 'GET_ITEM',
      payload: items.weapons.RustySword
    });
    // and equip it
    store.dispatch({
      type: 'EQUIP_ITEM',
      payload: store.getState().inventory.items[0]
    });
  }

  return(
    <Dialog>
      <div className='game-instructions-title'>
        {'Game Controls'}
      </div>

      <div className='game-instructions-text'>
        <span>
          {`MOVEMENT`}
        </span>

        <div className='flex-row space-between align-center'>
          <img src={ArrowKeys} alt='arrow-keys' />
          <img src={Swipe} alt='swipe' />
          <img src={WASDKeys} alt='wasd-keys' />
        </div>

        <span style={{paddingTop: 16}}>
          {`ATTACK`}
        </span>

        <div className='flex-row space-between align-center'>
          <img src={Space} alt='space' />
          <img src={DoubleTap} alt='double-tap' />
          <img src={Enter} alt='enter' />
        </div>

      </div>

      <div className='flex-column game-start-button'>
        <Button
          onClick={() => {
            handleShowMapMessage();
            handleLoadStartingItems();
          }}
          title={'Continue'} />
      </div>
    </Dialog>
  );
}

export default GameInstructions;