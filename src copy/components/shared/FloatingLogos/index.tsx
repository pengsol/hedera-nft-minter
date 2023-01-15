/*
 * Hedera NFT Minter App
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from 'react'
import classNames from 'classnames'
import map from 'lodash/map'
import keys from 'lodash/keys'
import { CSSTransition } from 'react-transition-group'
import Placeholder1 from '@assets/images/floating-logos/placeholder_1.jpeg'
import Placeholder2 from '@assets/images/floating-logos/placeholder_2.png'
import Placeholder3 from '@assets/images/floating-logos/placeholder_3.jpeg'
import Placeholder4 from '@assets/images/floating-logos/placeholder_4.jpeg'
import Placeholder5 from '@assets/images/floating-logos/placeholder_5.jpeg'
import Placeholder6 from '@assets/images/floating-logos/placeholder_6.jpeg'

import './floating-logos.scss'

type FloatingLogosProps = {
  isVisible: boolean;
}

export default function FloatingLogos({ isVisible }: FloatingLogosProps) {

  const cardClassName = classNames('floating-logos__card', {
    'floating-logos__card--is-visible': isVisible
  })

  function selectPlaceHolder(index: string): string | undefined {
    switch (parseInt(index) % 6 + 1) {
      case 1:

        return Placeholder1;
      case 2:
        return Placeholder2;
      case 3:
        return Placeholder3;
      case 4:
        return Placeholder4;
      case 5:
        return Placeholder5;
      case 6:
        return Placeholder6;

      default:
        break;
    }
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <CSSTransition
        in={isVisible}
        classNames='floating-logos--fade'
        timeout={1000}
      >
        <div className='floating-logos container--max-width'>
          <div className='floating-logos__container'>
            {map(keys([...new Array(25)]), (index) => (
              <div className={cardClassName} key={`floating-logos__card.${ index }`}>
                <div className='floating-logos__card__image'>
                  <img
                    src={selectPlaceHolder(index)}
                    alt={`floating-logos__card__image.${ index }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}
