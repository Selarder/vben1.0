import type {gradeGroup} from './newGroup'
const classGroupData: gradeGroup[] = [
  {
    label: '2023级',
    value: 'grade_2023',
    children: [
      {
        label: '计算机科学',
        value: 'major_cs',
        children: [
          {
            label: '2301班',
            value: 'class_2301',
            // 无children表示三级结构终点
          },
          {
            label: '2302班',
            value: 'class_2302',
          },
        ],
      },
    ],
  },
  {
    label: '2022级',
    value: 'grade_2022',
    children: [
      {
        label: '人工智能',
        value: 'major_ai',
        children: [
          {
            label: '2201班',
            value: 'class_2201',
          },
        ],
      },
    ],
  },
];

const fullGroupData:gradeGroup[] = [
  {
    label: '2023级',
    value: 'grade_2023',
    children: [
      {
        label: '计算机科学',
        value: 'major_cs',
        children: [
          {
            label: '2301班',
            value: 'class_2301',
            children: [
              {
                label: '张三 (学号: 20230101)',
                value: 'stu_20230101',
                studentId: '20230101',
              },
              {
                label: '李四 (学号: 20230102)',
                value: 'stu_20230102',
                studentId: '20230102',
              },
            ],
          },
          {
            label: '2302班',
            value: 'class_2302',
            children: [
              {
                label: '王五 (学号: 20230201)',
                value: 'stu_20230201',
                studentId: '20230201',
              },
            ],
          },
        ],
      },
      {
        label: '电子信息工程',
        value: 'major_ee',
        children: [
          {
            label: '2303班',
            value: 'class_2303',
            children: [], // 允许空班级
          },
        ],
      },
    ],
  },
  {
    label: '2022级',
    value: 'grade_2022',
    children: [
      {
        label: '软件工程',
        value: 'major_se',
        children: [], // 允许空专业
      },
    ],
  },
];

export { fullGroupData, classGroupData};
