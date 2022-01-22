import { Banner, Overview, Title } from "../Routes/layout";
import { makeImagePath } from "../utils";

const BannerCompo: React.FC<any> = ({ data }) => {
  return (
    <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
      <Title>{data?.results[0].title}</Title>
      <Overview>
        {data && data?.results[0].overview.length > 200
          ? `${data?.results[0].overview.slice(0, 255)}...`
          : data?.results[0].overview}
      </Overview>
    </Banner>
  );
};

export default BannerCompo;
