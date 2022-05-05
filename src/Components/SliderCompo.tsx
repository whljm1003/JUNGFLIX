import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import {
  Box,
  boxVariants,
  Info,
  infoVariants,
  NextBtn,
  Row,
  RowTitle,
  rowVariants,
  Slider,
} from "../Routes/layout";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";

const offset = 7;

const SliderCompo: React.FC<any> = ({ data, title }) => {
  const [latestIndex, setLatestIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const Increase = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setLatestIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movie: any) => {
    const { id, title } = movie;
    if (title) {
      navigate(`/movies/${id}`);
    } else {
      navigate(`/tv/${id}`);
    }
  };

  return (
    <Slider>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <RowTitle>{title}</RowTitle>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={latestIndex}
        >
          {data?.results
            .slice(1)
            .slice(offset * latestIndex, offset * latestIndex + offset)
            .map((info: any) => (
              <Box
                layoutId={info.id + ""}
                key={info.id}
                variants={boxVariants}
                whileHover="hover"
                initial="nomal"
                onClick={() => onBoxClicked(info)}
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(info.backdrop_path, "w500")}
              >
                <Info variants={infoVariants}>
                  <h4>{info.title ? info.title : info.name}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <NextBtn onClick={Increase}>
        <AiOutlineDoubleRight style={{ fontSize: "40px", fontWeight: "500" }} />
      </NextBtn>
    </Slider>
  );
};

export default SliderCompo;
