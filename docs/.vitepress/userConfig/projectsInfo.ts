interface Project {
  banner: string; // 图片链接
  title: string; // 项目标题
  description: string; // 项目简介
  link: string; // 项目链接
  tag?: string; // 项目标签
}

/**
 * TODO: 缺项处理
 * 在此处填写你的项目介绍
 */
export const projectsInfo: Project[] = [
  {
    banner: "../views/img/1.jpg", 
    title: "TickClock",
    description:
      " A time management software. Designed with react-native, react ,antd ,expo ,Tick-Clock It is a time management software supports web, ios, and Android. Your daily life partner. 我的大一课设： 滴答时钟--是一个简洁的时钟管家。",
    link: "https://github.com/LofiSu/tick-clock",
    tag: "TypeScript React-Native",
  },
    {
    banner: "../views/img/2.jpg", 
    title: "KawaResume",
    description:
      "A simple and beautiful resume template.  KawaResume It is a simple and beautiful resume template supports web. ",
    link: "https://github.com/LofiSu/kawa-resume",
    tag: "TailwindCSS React",
  },

];
