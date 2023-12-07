type SetaSimplesBaixoProps = {
  className?: string
}

export function SetaSimplesBaixo({ className }: SetaSimplesBaixoProps) {
  return (
    <svg
      className={className}
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.645 6L10 11.3433L15.355 6L17 7.645L10 14.645L3 7.645L4.645 6Z'
        fill='#616161'
      />
    </svg>
  )
}
