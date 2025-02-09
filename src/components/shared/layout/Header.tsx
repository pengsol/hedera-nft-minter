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

import { enableBodyScroll } from 'body-scroll-lock';
import classNames from 'classnames';
import { Divide as Hamburger } from 'hamburger-react';
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOnClickAway } from 'use-on-click-away';

import useHederaWallets, { ConnectionStateType } from '@hooks/useHederaWallets';
import { ModalContext } from '@utils/context/ModalContext';
import useLayout from '@utils/hooks/useLayout';

import WalletConnectionModal from '@src/components/shared/modals/ConnectionToWalletModal';

import Logo from '@assets/images/openbar_logo_completed_inverse.png';
import ConnectIcon from '@assets/images/icons/connect.svg'
import DiscordIcon from '@assets/images/icons/discord.svg'
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const Header = () => {
  const { connectedWalletType, userWalletId } = useHederaWallets();
  const { showModal, setModalContent } = useContext(ModalContext);
  const { goBackToMintTypeSelection, isMobileSmall, isMinterWizardWelcomeScreen } = useLayout();
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const expandedMenuRef = useRef(null);
  const [isMobileNavbarMenuExpanded, setIsMobileNavbarMenuExpanded] =
    useState(false);

  const handleShowModal = useCallback(() => {
    setModalContent(<WalletConnectionModal />);
    showModal();
  }, [setModalContent, showModal]);


  const isMobileNavbarMenuToogled = useMemo(() => (
    isMobileSmall && isMobileNavbarMenuExpanded
  ), [isMobileSmall, isMobileNavbarMenuExpanded]);

  const headerClassnames = classNames('header', {
    'header--shade': location.pathname === '/' && isMinterWizardWelcomeScreen,
    'is-mobile': isMobileSmall,
  });

  const mobileNavbarExpandedMenuClassnames = classNames(
    'header__mobile-menu__wrapper',
    {
      'header__mobile-menu__is-hide': !isMobileNavbarMenuToogled,
    }
  );

  const connectIconClassName = classNames('icon__connect', {
    'icon--active': connectedWalletType !== ConnectionStateType.NOCONNECTION
  })

  const closeNavbar = useCallback(() => {
    if (headerRef?.current) {
      enableBodyScroll(headerRef.current);
      setIsMobileNavbarMenuExpanded(false);
    }
  }, [setIsMobileNavbarMenuExpanded]);


  useOnClickAway(headerRef, () => {
    closeNavbar();
  });

  const handleLogoClick = useCallback(() => (
    location.pathname === '/' && !isMinterWizardWelcomeScreen && (
      goBackToMintTypeSelection && goBackToMintTypeSelection()
    )
  ), [isMinterWizardWelcomeScreen, location.pathname, goBackToMintTypeSelection])

  return (
    <header className={headerClassnames} ref={headerRef}>
      <div className={classNames('header-container', 'container--padding')}>
        <Link onClick={handleLogoClick} className='header__logo' to='/'>
          <img src={Logo} alt='hedera_logo' height={66} />{' '}
        </Link>
        {!isMobileSmall ? (
          <div className='header__buttons-wrapper'>
            <button className={connectIconClassName}>
              <img src={DiscordIcon} alt='discord_icon' />
              <div>
                <SwitchTransition>
                  <CSSTransition
                    key={connectedWalletType}
                    addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
                    classNames='fade'
                  >
                    <Link to='/my-nft-collection' className='icon__discord'>
                      <p >
                        Connect <br />
                        Discord
                      </p>
                    </Link>
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </button>

            <button onClick={handleShowModal} className={connectIconClassName}>
              <img src={ConnectIcon} alt='wallet_connect_icon' />
              <div>
                <SwitchTransition>
                  <CSSTransition
                    key={connectedWalletType}
                    addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
                    classNames='fade'
                  >
                    <div>
                      {connectedWalletType === ConnectionStateType.NOCONNECTION ? (
                        <>
                          Connect <br />
                          Wallet
                        </>
                      ) : (
                        <>
                          Connected <br />
                          {userWalletId}
                        </>
                      )}
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </button>
          </div>
        ) : (
          <Hamburger
            label='Show menu'
            rounded
            color='#464646'
            size={27}
            toggled={isMobileNavbarMenuToogled}
            toggle={setIsMobileNavbarMenuExpanded}
          />
        )
        }
      </div>
      {isMobileSmall && (
        <div
          className={mobileNavbarExpandedMenuClassnames}
          ref={expandedMenuRef}
        >
          <Link onClick={closeNavbar} to='/my-nft-collection'>
            My NFT Collection
          </Link>
          <button onClick={handleShowModal}>
            {connectedWalletType === ConnectionStateType.NOCONNECTION ? (
              'Connect Wallet'
            ) : (
              `Connected ${ userWalletId }`
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
