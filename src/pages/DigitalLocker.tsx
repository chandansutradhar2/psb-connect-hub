import { ArrowLeft, FileText, Upload, Download, Eye, Trash2, Lock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BankingLayout } from "@/components/BankingLayout";

const DigitalLocker = () => {
  const storageInfo = {
    used: 45,
    total: 100,
    files: 12
  };

  const documents = [
    {
      id: 1,
      name: "Aadhaar Card",
      type: "Identity Proof",
      size: "2.1 MB",
      uploadDate: "15 Oct 2024",
      category: "KYC Documents",
      isEncrypted: true,
      format: "PDF"
    },
    {
      id: 2,
      name: "PAN Card",
      type: "Identity Proof", 
      size: "1.8 MB",
      uploadDate: "15 Oct 2024",
      category: "KYC Documents",
      isEncrypted: true,
      format: "PDF"
    },
    {
      id: 3,
      name: "Salary Certificate",
      type: "Income Proof",
      size: "3.2 MB",
      uploadDate: "12 Oct 2024",
      category: "Financial Documents",
      isEncrypted: true,
      format: "PDF"
    },
    {
      id: 4,
      name: "Bank Statement - Oct 2024",
      type: "Account Statement",
      size: "4.5 MB",
      uploadDate: "01 Nov 2024",
      category: "Banking Documents",
      isEncrypted: true,
      format: "PDF"
    },
    {
      id: 5,
      name: "Home Loan Agreement",
      type: "Loan Document",
      size: "8.7 MB",
      uploadDate: "20 Sep 2024",
      category: "Legal Documents",
      isEncrypted: true,
      format: "PDF"
    },
    {
      id: 6,
      name: "Insurance Policy",
      type: "Insurance Document",
      size: "2.9 MB",
      uploadDate: "18 Sep 2024",
      category: "Insurance Documents",
      isEncrypted: true,
      format: "PDF"
    }
  ];

  const categories = [
    { name: "All Documents", count: 12, active: true },
    { name: "KYC Documents", count: 4, active: false },
    { name: "Financial Documents", count: 3, active: false },
    { name: "Banking Documents", count: 2, active: false },
    { name: "Legal Documents", count: 2, active: false },
    { name: "Insurance Documents", count: 1, active: false }
  ];

  return (
    <BankingLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center gap-4 p-4">
            <Link to="/dashboard">
              <ArrowLeft className="h-6 w-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-semibold">Digital Locker</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6" />
                <h2 className="text-lg font-semibold">Secure Storage</h2>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{storageInfo.files}</p>
                  <p className="text-sm opacity-75">Documents</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{storageInfo.used} MB</p>
                  <p className="text-sm opacity-75">Used</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{storageInfo.total} MB</p>
                  <p className="text-sm opacity-75">Total Space</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                  <div 
                    className="bg-primary-foreground h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(storageInfo.used / storageInfo.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2 opacity-75">
                  {storageInfo.total - storageInfo.used} MB available
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Bulk Download
            </Button>
          </div>

          <div>
            <Input
              placeholder="Search documents..."
              className="mb-4"
            />
            <div className="flex overflow-x-auto gap-2 pb-2 mb-4">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={category.active ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">My Documents</h2>
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{doc.type}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.uploadDate}</span>
                            <span>•</span>
                            <span>{doc.format}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {doc.category}
                        </Badge>
                        {doc.isEncrypted && (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <Lock className="h-3 w-3" />
                            <span>Encrypted</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">256-bit Encryption</p>
                    <p className="text-sm text-muted-foreground">Military-grade security</p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Auto Backup</p>
                    <p className="text-sm text-muted-foreground">Daily secure backups</p>
                  </div>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Access Logs</p>
                    <p className="text-sm text-muted-foreground">Track document access</p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BankingLayout>
  );
};

export default DigitalLocker;