"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

interface Upload {
  _id: string;
  title: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  price: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user?.role === 'ADMIN') {
      router.push('/admin');
      return;
    }

    fetchUserData();
  }, [session, status, router]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/uploads');
      const data = await response.json();
      setUploads(data.uploads || []); // Ensure uploads is always an array
      setEarnings(data.earnings || 0);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUploads([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{earnings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploads && uploads.length > 0 ? (
                uploads.map((upload) => (
                  <div key={upload._id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{upload.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(upload.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={
                      upload.status === 'APPROVED' ? 'secondary' :
                      upload.status === 'REJECTED' ? 'destructive' : 'default'
                    }>
                      {upload.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No uploads found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
