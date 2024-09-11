```src/pages/index.jsx
import React, { useEffect } from "react";

import Layout from "@theme/Layout";

import Translate from "@docusaurus/Translate";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import useBaseUrl from "@docusaurus/useBaseUrl";

import FeatureBlock from "../components/FeaturesList";

import WhatIs from "../components/WhatIs";

import Button from "../components/Button";

import GhButton from "../components/GitHubButton";

import AOS from "aos";

import "aos/dist/aos.css";

  

export default function Home() {

  const context = useDocusaurusContext();

  const { siteConfig = {} } = context;

  

  useEffect(() => {

    AOS.init({

      duration: 1000, // 动画持续时间

      easing: "ease-in-out", // 动画的缓动函数

      once: true, // 是否只在第一次滚动时触发动画

    });

  }, []);

  

  return (

    <Layout title={siteConfig.tagline} description={siteConfig.tagline}>

      <header className="hero">

        <div className="container text--center" data-aos="fade-up">

          <h2 className="hero__title">{siteConfig.title}</h2>

          <GhButton />

          <p className="hero__subtitle">{siteConfig.tagline}</p>

          <div className="heroButtons" data-aos="zoom-in">

            <Button href={useBaseUrl("docs/installation/summary")}>

              <Translate>Get Started</Translate>

            </Button>

            <Button href={useBaseUrl("docs/")}>

              <Translate>Learn More</Translate>

            </Button>

          </div>

        </div>

      </header>

  

      <WhatIs data-aos="fade-up" />

  

      <FeatureBlock data-aos="fade-up" />

  

      <div className="hero" data-aos="fade-up">

        <div className="container text--center">

          <h3 className="hero__subtitle">

            <Translate>OpenYurt is a</Translate>{" "}

            <a href="https://cncf.io/">Cloud Native Computing Foundation</a>{" "}

            <Translate>sandbox project</Translate>

          </h3>

          <div className="cncf-logo" />

        </div>

      </div>

    </Layout>

  );

}
```
