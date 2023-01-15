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

import { MintTypes } from '@utils/entity/MinterWizard'
import ButtonGroup from '@components/shared/form/button-group'
import Scrollbar from '@components/shared/layout/Scrollbar'
import ColabImg from '@assets/images/penglabs_colab.png'
import { Link } from 'react-router-dom'

type Props = {
  goToCreator: () => void,
}

export default function Welcome({ goToCreator }: Props) {
  return (
    <div className='minter-wizard__step minter-wizard__welcome minter-wizard__animation-container'>
      <Scrollbar>
        <div className='minter-wizard__step__wrapper minter-wizard__welcome__container'>
          <h1 className='title title--welcome'>
            Connect your NFTs <br />
            to Discord
          </h1>
          <img src={ColabImg} alt='welcome' />
          <Link to='/my-nft-collection' >
            <ButtonGroup
              direction='column'
              name='mint_type'
              options={[
                {
                  label: <>Explore my NFTs</>,
                  value: MintTypes.ExistingCollectionNewNFT,
                  tooltip: <>Some tooltip information</>,
                  onClick: goToCreator,
                  renderArrow: true
                },
              ]}
            />
          </Link>
        </div>

      </Scrollbar >
    </div >
  )
}
