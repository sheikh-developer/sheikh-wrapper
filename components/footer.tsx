import { FaGithub, FaTelegram, FaGlobe } from "react-icons/fa"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="w-full mt-12 px-6 py-8 border-t border-border text-sm">
      <div className="flex justify-center gap-6 items-center">
        <a href="https://github.com/sheikh-llm" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub className="text-xl text-muted-foreground hover:text-foreground" />
        </a>
        <a href="https://t.me/likhonsheikh" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
          <FaTelegram className="text-xl text-muted-foreground hover:text-foreground" />
        </a>
        <a href="https://translate.google.com/" target="_blank" rel="noopener noreferrer" aria-label="Translate">
          <FaGlobe className="text-xl text-muted-foreground hover:text-foreground" />
        </a>
        <Image src="/flag-bd.png" alt="Flag of Bangladesh" width={24} height={14} className="inline-block ml-2" />
      </div>
    </footer>
  )
}
