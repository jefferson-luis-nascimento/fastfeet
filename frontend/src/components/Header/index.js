import React from 'react';

import { NavLink } from 'react-router-dom';

import { Container, Content, Menu, Profile } from './styles';

import logo from '~/assets/fastfeet-logo.png';

const styles = {
  activeStyle: {
    fontWeight: 'bold',
    color: '#333',
  },
};

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Menu>
            <NavLink to="/dashboard" activeStyle={styles.activeStyle}>
              ENCOMENDAS
            </NavLink>
            <NavLink to="/deliverymen" activeStyle={styles.activeStyle}>
              ENTREGADORES
            </NavLink>
            <NavLink to="/recipients" activeStyle={styles.activeStyle}>
              DESTINATÁRIOS
            </NavLink>
            <NavLink to="/problems" activeStyle={styles.activeStyle}>
              PROBLEMAS
            </NavLink>
          </Menu>
        </nav>
        <aside>
          <Profile>
            <strong>Admin FastFeet</strong>
            <button type="button">Sair do Sistema</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
