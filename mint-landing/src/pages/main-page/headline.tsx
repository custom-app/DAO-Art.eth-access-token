import LargeAndSmall from '../../components/data-display/large-and-small';

export default function Headline(): JSX.Element {
  return (
    <LargeAndSmall
      large={'DAO-Art.eth'}
      small={'Genesis Membership'}
      typographyL={{
        xs: 'h3',
        md: 'h1',
      }}
      typographyS={{
        xs: 'h5',
        md: 'h3',
      }}
      className="animate-headline"
    />
  )
}
