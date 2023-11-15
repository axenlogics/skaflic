import Image from 'next/image';
import cx from "classnames";

const NoteCard = ({ className, children}: any) => {
    return <div className={cx('rounded-[15px] sm:rounded-[12px] bg-blend-normal bg-fff0c2 shadow-normal p-8', className)}>{children}</div>
}
const NoteCardHeading = ({ className, children}: any) => {
    return <div className={cx('text-171a1e text-base font-medium pb-[15px]', className)}>{children}</div>
}
const NoteCardItem = ({ className, children}: any) => {
    return <div className={cx('pt-3 flex', className)}>{children}</div>
}
export {NoteCard, NoteCardHeading, NoteCardItem}
  /*
export function NoteCard({text} : any) {

    return (
        <>
        <div className={cx('flex items-center m-[0px_0px_40px] rounded-[12px] bg-fff0c2 bg-blend-normal')}>
            <Image className={'m-[0_30px]'} src={`/assets/images/icons/danger-sign.svg`} alt={'info'}  width={24} height={24}/>
            <div className={'text-base font-medium p-[15px_15px_15px_0] text-d19800'}>
            {text}
            </div>
        </div>
        </>
    );
}*/