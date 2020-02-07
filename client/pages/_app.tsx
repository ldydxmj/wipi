import App, { Container } from "next/app";
import "antd/dist/antd.css";
import "@/theme/reset.scss";
import "@/theme/markdown.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
