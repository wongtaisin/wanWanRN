import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { getApiErrorMessage } from '../../services'
import { LoginRequest, signIn } from '../../services/auth'

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('提示', '请输入账号')
      return
    }

    if (!password.trim()) {
      Alert.alert('提示', '请输入密码')
      return
    }

    setLoading(true)
    setError(null)

    const payload: LoginRequest = {
      user_name: username.trim(),
      password
    }

    try {
      const result = await signIn(payload)

      if (result.code === 200) {
        Alert.alert('成功', '登录成功')
        onLoginSuccess()
        return
      }

      const message = result.message || '登录失败'
      setError(message)
      Alert.alert('提示', message)
    } catch (err) {
      const errorMsg = getApiErrorMessage(err)
      setError(errorMsg)
      Alert.alert('错误', errorMsg)
      console.error('登录失败:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>wanWan</Text>

        <TextInput
          style={styles.input}
          placeholder="账号"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          editable={!loading}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="密码"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          autoCapitalize="none"
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>登录</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  content: {
    padding: 20,
    paddingHorizontal: 30
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333'
  },

  errorText: {
    color: '#f56c6c',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14
  },

  button: {
    backgroundColor: '#409eff',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 20
  },

  buttonDisabled: {
    opacity: 0.6
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default Login
