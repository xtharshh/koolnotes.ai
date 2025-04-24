"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";

interface Upload {
  _id: string;
  title: string;
  userId: {
    name: string;
    email: string;
  };
  status: string;
  createdAt: string;
}

interface Stats {
  pending: number;
  approved: number;
  rejected: number;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [pendingUploads, setPendingUploads] = useState<Upload[]>([]);
  const [allUploads, setAllUploads] = useState<Upload[]>([]);
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    if (session?.user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    const fetchUploads = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/uploads');
        if (response.ok) {
          const data = await response.json();
          const uploads = data.uploads || [];
          setPendingUploads(uploads.filter(upload => upload.status === 'PENDING'));
          setAllUploads(uploads);
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch uploads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUploads();
  }, [session, router]);

  const handleApproval = async (uploadId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/uploads/${uploadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to update status');

      setPendingUploads(data.uploads.filter(upload => upload.status === 'PENDING'));
      setAllUploads(data.uploads);
      setStats(data.stats);

      toast({
        title: "Success",
        description: data.message,
        variant: status === 'APPROVED' ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Error updating upload:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.rejected}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="all">All Uploads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading...</p>
              ) : pendingUploads && pendingUploads.length > 0 ? (
                pendingUploads.map((upload) => (
                  <div key={upload._id} className="flex justify-between items-center p-4 border-b">
                    <div>
                      <p className="font-medium">{upload.title}</p>
                      <p className="text-sm text-muted-foreground">
                        By: {upload.userId.name} ({upload.userId.email})
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        onClick={() => handleApproval(upload._id, 'APPROVED')}
                        variant="default"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleApproval(upload._id, 'REJECTED')}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No pending uploads found</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              {allUploads.map((upload) => (
                <div key={upload._id} className="flex justify-between items-center p-4 border-b">
                  <div>
                    <p className="font-medium">{upload.title}</p>
                    <p className="text-sm text-muted-foreground">
                      By: {upload.userId.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(upload.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={
                    upload.status === 'APPROVED' ? 'secondary' :
                    upload.status === 'REJECTED' ? 'destructive' : 
                    'default'
                  }>
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
