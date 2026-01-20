import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { PROJECT_DATA, WRITING_DATA } from '@/lib/data';

// Define loose interfaces for flexibility, but compatible with existing data
export interface Project {
    id: string;
    title: string;
    problem: string;
    role: string;
    stack: string;
    outcome: string;
    [key: string]: any;
}

export interface Article {
    id: string;
    title: string;
    premise: string;
    date: string;
    readTime: string;
    [key: string]: any;
}

export function useProjects() {
    const firestore = useFirestore();
    const [projects, setProjects] = useState<Project[]>(PROJECT_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            if (!firestore) return;
            try {
                const q = query(collection(firestore, 'projects'), orderBy('date', 'desc')); // Assuming date field exists, or use custom order
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
                    setProjects(fetchedData);
                } else {
                    // Fallback is already set
                }
            } catch (error) {
                console.warn("Failed to fetch projects from Firestore, using static backup", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, [firestore]);

    return { projects, loading };
}

export function useWritings() {
    const firestore = useFirestore();
    const [writings, setWritings] = useState<Article[]>(WRITING_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWritings() {
            if (!firestore) return;
            try {
                const q = query(collection(firestore, 'writings'), orderBy('date', 'desc'));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
                    setWritings(fetchedData);
                }
            } catch (error) {
                console.warn("Failed to fetch writings from Firestore, using static backup", error);
            } finally {
                setLoading(false);
            }
        }
        fetchWritings();
    }, [firestore]);

    return { writings, loading };
}
