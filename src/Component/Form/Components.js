import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff !important;
  border-radius: 10px !important;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
  position: relative !important;
  overflow: hidden !important;
  width: 678px !important;
  max-width: 100% !important;
  min-height: 400px !important;
`;

export const SignUpContainer = styled.div`
  position: absolute !important;
  top: 0 !important;
  height: 100% !important;
  transition: all 0.6s ease-in-out !important;
  left: 0 !important;
  width: 50% !important;
  opacity: 0 !important;
  z-index: 1 ;
  ${props =>
    props.signingIn !== true
      ? `
    transform: translateX(100%) !important;
    opacity: 1 !important;
    z-index: 5 ;
    `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute !important;
  top: 0 !important;
  height: 100% !important;
  transition: all 0.6s ease-in-out !important;
  left: 0 !important;
  width: 50% !important;
  z-index: 2 ;
  ${props => (props.signingIn !== true ? `transform: translateX(100%) !important;` : null)}
`;

export const Form = styled.form`
  background-color: #ffffff !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;
  padding: 0 50px !important;
  height: 100% !important;
  text-align: center !important;
`;

export const Title = styled.h1`
  font-weight: bold !important;
  margin: 0 !important;
`;

export const Input = styled.input`
  background-color: #eee !important;
  border: none !important;
  padding: 12px 15px !important;
  margin: 8px 0 !important;
  width: 100% !important;
`;

export const Button = styled.button`
  border-radius: 20px !important;
  border: 1px solid #ff4b2b !important;
  background-color: #ff4b2b !important;
  color: #ffffff !important;
  font-size: 12px !important;
  font-weight: bold !important;
  padding: 12px 45px !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  transition: transform 80ms ease-in !important;
  &:active {
    transform: scale(0.95) !important;
  }
  &:focus {
    outline: none !important;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent !important;
  border-color: #ffffff !important;
`;

export const Anchor = styled.a`
  color: #333 !important;
  font-size: 14px !important;
  text-decoration: none !important;
  margin: 15px 0 !important;
`;

export const OverlayContainer = styled.div`
  position: absolute !important;
  top: 0 !important;
  left: 50% !important;
  width: 50% !important;
  height: 100% !important;
  overflow: hidden !important;
  transition: transform 0.6s ease-in-out !important;
  z-index: 1;
  ${props =>
    props.signingIn !== true ? `transform: translateX(-100%) !important;` : null}
`;

export const Overlay = styled.div`
  background: #ff416c !important;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c) !important;
  background: linear-gradient(to right, #ff4b2b, #ff416c) !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: 0 0 !important;
  color: #ffffff !important;
  position: relative !important;
  left: -100% !important;
  height: 100% !important;
  width: 200% !important;
  transform: translateX(0) !important;
  transition: transform 0.6s ease-in-out !important;
  ${props => (props.signingIn !== true ? `transform: translateX(50%) !important;` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;
  padding: 0 40px !important;
  text-align: center !important;
  top: 0 !important;
  height: 100% !important;
  width: 50% !important;
  transform: translateX(0) !important;
  transition: transform 0.6s ease-in-out !important;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%) !important;
  ${props => (props.signingIn !== true ? `transform: translateX(0) !important;` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0 !important;
  transform: translateX(0) !important;
  ${props => (props.signingIn !== true ? `transform: translateX(20%) !important;` : null)}
`;

export const Paragraph = styled.p`
  font-size: 14px !important;
  font-weight: 100 !important;
  line-height: 20px !important;
  letter-spacing: 0.5px !important;
  margin: 20px 0 30px !important;
`;
