import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { fetchMahasiswa } from '../services/firestoreService';
import { logoutUser } from '../services/authService';
import { getUserData } from '../config/storage';

const HomeScreen = ({ navigation }) => {
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const userData = getUserData();

  useEffect(() => {
    loadMahasiswa();
  }, []);

  const loadMahasiswa = async () => {
    setLoading(true);
    const result = await fetchMahasiswa();

    if (result.success) {
      setMahasiswaList(result.data);
    } else {
      Alert.alert('Error', result.error);
    }

    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMahasiswa();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert('Konfirmasi', 'Yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          const result = await logoutUser();
          if (result.success) {
            navigation.replace('Login');
          } else {
            Alert.alert('Error', result.error);
          }
        },
      },
    ]);
  };

  const renderMahasiswa = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.nama}</Text>
        <View style={styles.semesterBadge}>
          <Text style={styles.semesterText}>Sem {item.semester}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>NIM</Text>
          <Text style={styles.infoValue}>{item.nim}</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Jurusan</Text>
          <Text style={styles.infoValue}>{item.jurusan}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Belum Ada Data</Text>
      <Text style={styles.emptySubtitle}>
        Data mahasiswa akan muncul di sini
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={loadMahasiswa}>
        <Text style={styles.retryButtonText}>Muat Ulang</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Data Mahasiswa</Text>
            <Text style={styles.headerSubtitle}>{userData.email}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Keluar</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : (
          <FlatList
            data={mahasiswaList}
            renderItem={renderMahasiswa}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={renderEmpty}
            ListHeaderComponent={
              mahasiswaList.length > 0 ? (
                <View style={styles.listHeader}>
                  <Text style={styles.listHeaderText}>
                    {mahasiswaList.length} mahasiswa terdaftar
                  </Text>
                </View>
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#2563eb']}
                tintColor="#2563eb"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#dbeafe',
    marginTop: 4,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  listHeader: {
    marginBottom: 12,
  },
  listHeaderText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  semesterBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  semesterText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default HomeScreen;
