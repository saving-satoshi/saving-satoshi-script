//import { usePathname } from 'next/navigation'

export default function usePathData() {
  //const pathName = usePathname() || ''

  //let [lang, pageId, chapterId, lessonId] = pathName.split('/').filter((p) => p)

  //if (!lang) {
    let [lang, pageId, chapterId, lessonId] = ['en', 'chapters', 'chapter-1', 'intro-1']
  //}

  return {
    lang,
    pageId,
    chapterId,
    lessonId,
  }
}
