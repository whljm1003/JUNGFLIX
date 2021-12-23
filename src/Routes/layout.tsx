import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.black.veryDark};
  padding-bottom: 200px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  font-weight: 400;
  color: ${(props) => props.theme.white.darker};
`;

export const Overview = styled.p`
  font-size: 35px;
  width: 50%;
  color: ${(props) => props.theme.white.darker};
`;

export const Slider = styled.div`
  position: relative;
  top: -120px;
  height: 35vh;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(7, 1fr);
  position: absolute;
  width: 100%;
`;

export const RowTitle = styled.h2`
  font-weight: 500;
  font-size: 27px;
  margin-top: 10px;
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 30vh;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 45vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  background-color: ${(props) => props.theme.black.lighter};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NextBtn = styled.div`
  width: 60px;
  height: 30vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  cursor: pointer;
`;

export const rowVariants = {
  hidden: {
    // window.outerWidth => 사용자 컴퓨터 길이
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

export const boxVariants = {
  nomal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
