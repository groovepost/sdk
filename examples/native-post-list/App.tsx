import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Button, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { createGroovePostClient, type GroovePostSiteConfig, type GroovePostAppConfig } from '@groovepost/app-sdk'
import { NativeApp } from '@groovepost/app-native'

export default function App() {
  const apiURL = process.env.EXPO_PUBLIC_GROOVEPOST_API_URL
  const tenant = process.env.EXPO_PUBLIC_GROOVEPOST_TENANT
  const environment = process.env.EXPO_PUBLIC_GROOVEPOST_ENVIRONMENT
  const client = useMemo(() => apiURL && tenant && environment ? createGroovePostClient({ apiUrl: apiURL, tenantSlug: tenant, environment }) : null, [apiURL, tenant, environment])
  const [siteConfig, setSiteConfig] = useState<GroovePostSiteConfig | null>(null)
  const [config, setConfig] = useState<GroovePostAppConfig | null>(null), [error, setError] = useState(''), [retry, setRetry] = useState(0)
  useEffect(() => {
    if (!client) return
    let stopped = false
    setConfig(null); setError('')
    void Promise.all([client.getAppConfig(), client.getSiteConfig()]).then(([value, site]) => { if (!stopped) { setConfig(value); setSiteConfig(site) } }).catch(() => { if (!stopped) setError('The published app configuration could not be loaded.') })
    return () => { stopped = true }
  }, [client, retry])
  return <SafeAreaProvider><SafeAreaView style={{ flex: 1 }}>{!client ? <Text>Configure the API URL, tenant and environment in .env.</Text> : error ? <View accessibilityRole="alert"><Text>{error}</Text><Button title="Retry" onPress={() => setRetry((value) => value + 1)} /></View> : !config ? <ActivityIndicator accessibilityLabel="Loading app configuration" /> : !config.configuration ? <Text>Publish a layout in App Builder first.</Text> : <NativeApp configuration={config.configuration} client={client} siteConfig={siteConfig ?? undefined} />}</SafeAreaView></SafeAreaProvider>
}
