import LargeAndSmall from '../../components/data-display/large-and-small';

export default function Headline(): JSX.Element {
  return (
    <LargeAndSmall
      large={'Web3Jedis Holocron'}
      small={'Mint to access the High Council'}
      typographyL={{
        xs: 'h4',
        md: 'h2',
      }}
      typographyS={{
        xs: 'h6',
        md: 'h4',
      }}
      className="animate-headline"
    />
  )
}
