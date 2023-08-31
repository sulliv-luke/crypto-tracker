import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';


const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  //background: linear-gradient(100.26deg, rgba(0, 102, 255, 0.05) 42.33%, rgba(150, 0, 225, 0.05) 127.07%);
`;


const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.h1`
  font-weight: 600;
  font-size: 20px;
  color: gold;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: gold;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Created by Luke Sullivan</Logo>
        <Nav>
          <NavLink href="https://sulliv-luke.github.io/portfolio-react/#about" target='display'>About</NavLink>
          <NavLink href="https://sulliv-luke.github.io/portfolio-react/#skills" target='display'>Skills</NavLink>
          <NavLink href="https://sulliv-luke.github.io/portfolio-react/#experience" target='display'>Experience</NavLink>
          <NavLink href="https://sulliv-luke.github.io/portfolio-react/#projects" target='display'>Projects</NavLink>
          <NavLink href="https://sulliv-luke.github.io/portfolio-react/#education" target='display'>Education</NavLink>
        </Nav>
        <SocialMediaIcons>
          <SocialMediaIcon href={"https://www.facebook.com/profile.php?id=100078173222000"} target="display"><FacebookIcon /></SocialMediaIcon>
          <SocialMediaIcon href={"https://twitter.com/sullyluke15"} target="display"><TwitterIcon /></SocialMediaIcon>
          <SocialMediaIcon href={"https://www.linkedin.com/in/luke-sullivan123/"} target="display"><LinkedInIcon /></SocialMediaIcon>
          <SocialMediaIcon href={"https://www.instagram.com/luke.sullivan15/"} target="display"><InstagramIcon /></SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>
          &copy; 2023 Luke Sullivan. All rights reserved.
        </Copyright>

      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;