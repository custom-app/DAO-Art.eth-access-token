import LargeAndSmall from '../../components/data-display/large-and-small';

export default function Headline(): JSX.Element {
  return (
    <LargeAndSmall
      large={'DAO-Art.eth'}
      small={'Genesis Membership'}
      typographyL={'h1'} typographyS={'h3'}
    />
  )
}
