在src的pages里面添加team文件夹

index.jsx
```jsx
import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useIsBrowser from "@docusaurus/useIsBrowser";

import config from "./languages.json";

import Layout from "@theme/Layout";

import "./index.scss";

import Github from "./github.svg";

import AOS from "aos";

import "aos/dist/aos.css";

  

export default function () {

  const isBrowser = useIsBrowser();

  const language =

    isBrowser && location.pathname.indexOf("/zh-CN/") === 0 ? "zh-CN" : "en";

  const dataSource = config?.[language];

  

  function getGitName(url) {

    return "@" + url.replace("https://github.com/", "");

  }

  

  function avatarUrl(id) {

    return "https://avatars.githubusercontent.com/u/" + id + "?v=4";

  }

  

  return (

    <Layout>

      <BrowserOnly>

        {() => {

          // AOS JS

          AOS.init({

            offset: 100,

            duration: 700,

            easing: "ease-out-quad",

            once: !0,

          });

          window.addEventListener("load", AOS.refresh);

          return (

            <div

              className="block team_page container overflow-hidden"

              style={{ padding: "10px 0 30px" }}

            >

              <h3 className="fs-2 mb-4 fw-bold text-center">OpenYurt Team</h3>

              <p className="team_desc team_indent">{dataSource.info.desc}</p>

              <h3 className="team_title">

                Reviewers

                <span className="desc">

                  Reviewers apply to all OpenYurt repositories.

                </span>

              </h3>

  

              <div className="team-group">

                {dataSource.reviewers.map((item, i) => (

                  <div

                    className="team-box my-3"

                    key={i}

                    data-aos="fade-up"

                    data-aos-delay={i * 100}

                  >

                    <div className="hover-top-in text-center">

                      <div className="team-user overflow-hidden z-index-1 position-relative px-5 d-flex justify-content-center">

                        <img

                          className="team-user-img"

                          src={avatarUrl(item.githubId)}

                          title=""

                          alt=""

                        />

                      </div>

                      <div className="position-relative bg-team text-center hover-top--in">

                        <h6 className="font-weight-bold team-name mb-1">

                          {item.name}

                        </h6>

                        <small>{getGitName(item.gitUrl)}</small>

                        <div className="pt-2">

                          <a className="icon-sm team-link" href={item.gitUrl}>

                            <Github className="github-icon" />

                          </a>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

  

              <h3 className="team_title">Approvers</h3>

              <div className="team-group">

                {dataSource.approvers.map((item, i) => (

                  <div

                    className="team-box my-3"

                    key={i}

                    data-aos="fade-up"

                    data-aos-delay={i * 100}

                  >

                    <div className="hover-top-in text-center">

                      <div className="team-user overflow-hidden z-index-1 position-relative px-5 d-flex justify-content-center">

                        <img

                          className="team-user-img"

                          src={avatarUrl(item.githubId)}

                          title=""

                          alt=""

                        />

                      </div>

                      <div className="position-relative bg-team text-center hover-top--in">

                        <h6 className="font-weight-bold team-name mb-1">

                          {item.name}

                        </h6>

                        <small>{getGitName(item.gitUrl)}</small>

                        <div className="pt-2">

                          <a className="icon-sm team-link" href={item.gitUrl}>

                            <Github className="github-icon" />

                          </a>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

  

              <h3 className="team_title">

                Maintainers

                <span className="desc">

                  Maintainers apply to all OpenYurt repositories.

                </span>

              </h3>

              <div className="team-group">

                {dataSource.maintainers.map((item, i) => (

                  <div

                    className="team-box my-3"

                    key={i}

                    data-aos="fade-up"

                    data-aos-delay={i * 100}

                  >

                    <div className="hover-top-in text-center">

                      <div className="team-user overflow-hidden z-index-1 position-relative px-5 d-flex justify-content-center">

                        <img

                          className="team-user-img"

                          src={avatarUrl(item.githubId)}

                          title=""

                          alt=""

                        />

                      </div>

                      <div className="position-relative bg-team text-center hover-top--in">

                        <h6 className="font-weight-bold team-name mb-1">

                          {item.name}

                        </h6>

                        <small>{getGitName(item.gitUrl)}</small>

                        <div className="pt-2">

                          <a className="icon-sm team-link" href={item.gitUrl}>

                            <Github className="github-icon" />

                          </a>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

  

              <h3 className="team_title">Contributors</h3>

              <span className="desc">{dataSource.info.contributors}</span>

              <div className="col py-5">

                <img src="https://contrib.rocks/image?repo=openyurtio/openyurt.io" />

                <img src="https://contrib.rocks/image?repo=openyurtio/openyurt" />

              </div>

            </div>

          );

        }}

      </BrowserOnly>

    </Layout>

  );

}
```

index.scss
```scss
.team_page {

  text-align: center; // 使所有文本内容居中对齐

  margin-top: 50px !important;

  

  a {

    text-decoration: none;

  }

  

  .team_title {

    font-size: 25px;

    font-weight: 500;

    color: var(--ifm-color-primary-contrast-foreground);

    margin-top: 50px;

    margin-bottom: 3rem;

    position: relative;

    text-align: center;

  

    .desc {

      display: block;

      margin-top: 8px;

    }

  }

  

  .team_desc {

    margin-bottom: 40px;

  }

  

  .team_indent {

    line-height: 40px;

  }

  

  .desc {

    font-size: 1rem;

    color: var(--ifm-color-gray-700);

    margin-left: 1.2rem;

  }

}

  

/*****************************

  team

*****************************/

.team-group {

  $colum-width: minmax(165px, 1fr);

  display: grid;

  grid-template-columns: repeat(auto-fill, $colum-width);

  grid-row-gap: 20px;

  grid-column-gap: 20px;

  justify-content: center; // 使团队成员卡片居中

}

  

.team-user-img {

  aspect-ratio: 1 / 1;

  min-width: 100px;

  border-radius: 50%;

  border: 5px solid #fff;

  box-shadow: 0 .375rem 1.5rem 0 rgba(87, 96, 113, .125) !important;

}

  

[data-theme="dark"] .team-user-img {

  border: 5px solid #95999c;

}

  

.hover-top-in {

  .hover-top--in {

    transition: ease-in-out all .35s;

    position: relative;

    top: 0;

  

    &:hover {

      top: -10px;

    }

  }

}

  

.bg-team {

  margin-top: -1.5rem !important;

  padding: 2.5rem 1rem .5rem 1rem;

  background-color: rgb(255, 255, 255) !important;

  border-radius: .75rem;

  box-shadow: 0 .375rem 1.5rem 0 rgba(87, 96, 113, .125) !important;

  display: flex;

  flex-direction: column;

  align-items: center; // 使内容居中

  

  [data-theme="dark"] & {

    background-color: rgb(14, 17, 20) !important;

  }

}

  

.team-link {

  background-color: #fff;

  border-radius: 50%;

  width: 1.5rem;

  height: 1.5rem;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  text-align: center;

  font-size: 75%;

  line-height: normal;

  margin-right: .25rem;

  

  .github-icon {

    width: 20px;

    height: 20px;

    color: #fff;

  }

  

  [data-theme="dark"] & {

    background-color: #95999c;

  }

}

  

.team-name {

  font-size: 1rem;

  height: 40px;

}

  

// mobile theme

@media screen and (max-width: 996px) {

  .team_page {

    margin-top: 20px !important;

  

    .team_indent {

      line-height: 30px;

    }

  

    .team_title {

      margin-top: 20px;

      margin-bottom: 20px;

    }

  }

}
```

language.json用github来获取api：
你可以通过 GitHub API 直接获取用户或组织的数字 ID。
- 用户的 API URL 通常为：
  ```
  https://api.github.com/users/{username}
  ```
- 组织的 API URL 通常为：
  ```
  https://api.github.com/orgs/{orgname}
  ```

用你要查询的用户名替换 `{username}`，然后访问该 URL。

**例子**：对于 GitHub 用户 `octocat`，API URL 是：
```
https://api.github.com/users/octocat
```

访问这个 URL 后，你会看到一个 JSON 响应，其中包含 `id` 字段，就是数字 ID。

```json
{

  "zh-CN": {

    "info": {

      "desc": "OpenYurt 社区由贡献者组成。 贡献者可以直接访问 OpenYurt 项目的源代码并参与贡献当中(包括但不限于代码的贡献)。 贡献者通过提交补丁和建议来改善项目。 该项目的贡献者数量是无限的。 无论是琐碎的清理工作，重要的新功能还是其他重大的奖励，对 OpenYurt 所做的所有贡献都将受到极大的赞赏。",

      "contributors": "感谢所有为 OpenYurt 做出贡献的贡献者们！"

    },

    "reviewers" : [

      {

        "githubId": "4555057",

        "gitUrl": "https://github.com/huiwq1990",

        "name": "huiwq1990"

      },

      {

        "githubId": "52201043",

        "gitUrl": "https://github.com/Rui-Gan",

        "name": "Rui-Gan"

      },

      {

        "githubId": "9349609",

        "gitUrl": "https://github.com/donychen1134",

        "name": "donychen1134"

      },

      {

        "githubId": "18587688",

        "gitUrl": "https://github.com/fengshunli",

        "name": "fengshunli"

      },

      {

        "githubId": "29064882",

        "gitUrl": "https://github.com/huweihuang",

        "name": "huweihuang"

      },

      {

        "githubId": "53330071",

        "gitUrl": "https://github.com/Lan-ce-lot",

        "name": "Lan-ce-lot"

      },

      {

        "githubId": "3379666",

        "gitUrl": "github.com/MrGirl",

        "name": "MrGirl"

      },

      {

        "githubId": "59680532",

        "gitUrl": "https://github.com/River-sh",

        "name": "River-sh"

      },

      {

        "githubId": "60642406",

        "gitUrl": "github.com/xavier-hou",

        "name": "xavier-hou"

      }

    ],

     "approvers": [

      {

        "githubId": "1227737",

        "gitUrl": "https://github.com/wawlian",

        "name": "wawlian"

      },

      {

        "githubId": "36974756",

        "gitUrl": "https://github.com/kadisi",

        "name": "kadisi"

      },

      {

        "githubId": "32788286",

        "gitUrl": "https://github.com/Congrool",

        "name": "Congrool"

      },

      {

        "githubId":"40822107",

        "gitUrl":"https://github.com/YTGhost",

        "name":"YTGhost"

      },

      {

        "githubId": "26163841",

        "gitUrl": "https://github.com/Arhell",

        "name": "Arhell"

      },

      {

        "githubId": "28707897",

        "gitUrl": "https://github.com/luc99hen",

        "name": "luc99hen"

      },

      {

        "githubId": "3598874",

        "gitUrl": "https://github.com/BSWANG",

        "name": "BSWANG"

      },

      {

        "githubId": "15940738",

        "gitUrl": "https://github.com/njucjc",

        "name": "njucjc"

      }

    ],

    "maintainers" : [

      {

        "githubId": "43253347",

        "gitUrl": "https://github.com/Fei-Guo",

        "name": "Fei-Guo"

      },

      {

        "githubId": "57081505",

        "gitUrl": "https://github.com/rambohe-ch",

        "name": "rambohe-ch"

      },

      {

        "githubId": "24984513",

        "gitUrl": "https://github.com/lwmqwer",

        "name": "lwmqwer"

      },

      {

        "githubId": "19216271",

        "gitUrl": "https://github.com/gnunu",

        "name": "gnunu"

      },

      {

        "githubId": "13131331",

        "gitUrl": "https://github.com/zzguang",

        "name": "zzguang"

      },

      {

        "githubId": "8869360",

        "gitUrl": "https://github.com/luckymrwang",

        "name": "luckymrwang"

      },

      {

        "githubId": "70508195",

        "gitUrl": "https://github.com/JameKeal",

        "name": "JameKeal"

      },

       {

        "githubId": "33485524",

        "gitUrl": "https://github.com/LavenderQAQ",

        "name": "LavenderQAQ"

      },

      {

        "githubId": "20311331",

        "gitUrl": "https://github.com/zyjhtangtang",

        "name": "zyjhtangtang"

      }

    ]

  },

  "en": {

    "info": {

      "desc": "The OpenYurt team is comprised of Members and Contributors. Members have direct access to the source of OpenYurt project and actively evolve the code-base. Contributors improve the project through submission of patches and suggestions to the Members. The number of Contributors to the project is unbounded. All contributions to OpenYurt are greatly appreciated, whether for trivial cleanups, big new features or other material rewards.",

      "contributors": "Thanks all the contributors who already contributed to OpenYurt!"

    },

    "reviewers" : [

      {

        "githubId": "4555057",

        "gitUrl": "https://github.com/huiwq1990",

        "name": "huiwq1990"

      },

      {

        "githubId": "52201043",

        "gitUrl": "https://github.com/Rui-Gan",

        "name": "Rui-Gan"

      },

      {

        "githubId": "9349609",

        "gitUrl": "https://github.com/donychen1134",

        "name": "donychen1134"

      },

      {

        "githubId": "18587688",

        "gitUrl": "https://github.com/fengshunli",

        "name": "fengshunli"

      },

      {

        "githubId": "29064882",

        "gitUrl": "https://github.com/huweihuang",

        "name": "huweihuang"

      },

      {

        "githubId": "53330071",

        "gitUrl": "https://github.com/Lan-ce-lot",

        "name": "Lan-ce-lot"

      },

      {

        "githubId": "3379666",

        "gitUrl": "github.com/MrGirl",

        "name": "MrGirl"

      },

      {

        "githubId": "59680532",

        "gitUrl": "https://github.com/River-sh",

        "name": "River-sh"

      },

      {

        "githubId": "60642406",

        "gitUrl": "github.com/xavier-hou",

        "name": "xavier-hou"

      }

    ],

    "approvers": [

      {

        "githubId": "1227737",

        "gitUrl": "https://github.com/wawlian",

        "name": "wawlian"

      },

      {

        "githubId": "36974756",

        "gitUrl": "https://github.com/kadisi",

        "name": "kadisi"

      },

      {

        "githubId": "32788286",

        "gitUrl": "https://github.com/Congrool",

        "name": "Congrool"

      },

      {

        "githubId":"40822107",

        "gitUrl":"https://github.com/YTGhost",

        "name":"YTGhost"

      },

      {

        "githubId": "26163841",

        "gitUrl": "https://github.com/Arhell",

        "name": "Arhell"

      },

      {

        "githubId": "28707897",

        "gitUrl": "https://github.com/luc99hen",

        "name": "luc99hen"

      },

      {

        "githubId": "3598874",

        "gitUrl": "https://github.com/BSWANG",

        "name": "BSWANG"

      },

      {

        "githubId": "15940738",

        "gitUrl": "https://github.com/njucjc",

        "name": "njucjc"

      }

    ],

    "maintainers" : [

      {

        "githubId": "43253347",

        "gitUrl": "https://github.com/Fei-Guo",

        "name": "Fei-Guo"

      },

      {

        "githubId": "57081505",

        "gitUrl": "https://github.com/rambohe-ch",

        "name": "rambohe-ch"

      },

      {

        "githubId": "24984513",

        "gitUrl": "https://github.com/lwmqwer",

        "name": "lwmqwer"

      },

      {

        "githubId": "19216271",

        "gitUrl": "https://github.com/gnunu",

        "name": "gnunu"

      },

      {

        "githubId": "13131331",

        "gitUrl": "https://github.com/zzguang",

        "name": "zzguang"

      },

      {

        "githubId": "8869360",

        "gitUrl": "https://github.com/luckymrwang",

        "name": "luckymrwang"

      },

      {

        "githubId": "70508195",

        "gitUrl": "https://github.com/JameKeal",

        "name": "JameKeal"

      },

       {

        "githubId": "33485524",

        "gitUrl": "https://github.com/LavenderQAQ",

        "name": "LavenderQAQ"

      },

      {

        "githubId": "20311331",

        "gitUrl": "https://github.com/zyjhtangtang",

        "name": "zyjhtangtang"

      }

    ]

  }

}
```

```github.svg
<svg t="1662907603281" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2360" width="200" height="200"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="2361"></path></svg>
```