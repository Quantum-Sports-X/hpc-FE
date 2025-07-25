const IP4_REGEX = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/

const PUBLIC_SUFFIXES = ['co.uk', 'com', 'org', 'net', 'hostingersite.com']

const getDomain = () => {
  const hostname = window.location.hostname

  // If hostname is an IP address, return it
  if (IP4_REGEX.test(hostname)) {
    return hostname
  }

  // Split hostname into parts
  const parts = hostname.split('.')
  if (parts.length <= 2) {
    return hostname // Example: localhost or single-domain environments
  }

  // Check for public suffixes (like co.uk) and return proper domain
  const domain = parts.slice(-2).join('.') // Default: last two parts
  if (PUBLIC_SUFFIXES.includes(domain)) {
    return parts.slice(-3).join('.') // Include third part for domains like *.co.uk
  }

  return domain
}

export default getDomain
