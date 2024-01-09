import { QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { renderByUVersion } from "../../utils/renderByUVersion";
import cx from 'classnames'





export const QuestionTipsIcon = (props: { className?: string }) => {
  return (
    renderByUVersion({
      "u1": <QuestionCircleFilled className={cx('text-white', props.className)} />,
      "wild777bet": <QuestionCircleOutlined className={cx('text-[#FF8A00]', props.className)} />,
      "u2": <QuestionCircleOutlined className={cx('text-[#B3B3B3]', props.className)} />,
    }, <QuestionCircleOutlined className={cx('text-[#FF8A00]', props.className)} />
    )
  )
}
