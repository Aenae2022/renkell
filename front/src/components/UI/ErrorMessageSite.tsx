import { useTranslation } from "react-i18next"
type ErrorMessageSiteProps = {
    message: string;
}
export const ErrorMessageSite = ({message} : ErrorMessageSiteProps)=> {
    const {t} = useTranslation()

    return  <div className="m-auto bg-red-200  border-3 border-red-600 rounded-md max-w-[60%] text-center p-4">
              <p>{t(message)}</p>
            </div>
}