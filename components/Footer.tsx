import LinkPreview from "@components/LinkPreview"

export default function Footer(): JSX.Element {
  return (
    <footer className="pb-px body">
      <hr />
      <div className="my-16 text-center text-xs font-light text-gray-600 dark:text-gray-400 sm:text-sm">
        Crafted with care by{" "}
        <span className="font-normal">
          <LinkPreview
            name="alexandru.eth"
            href="https://twitter.com/shalomlijo"
            preview="/images/twitter-preview.png"
            alt="Solomon Lijo's Twitter"
            style="neutral"
            showExternalIndicator={false}
          />
        </span>
      </div>
    </footer>
  )
}
