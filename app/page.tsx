import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Search, Table, Eye, Clipboard } from "lucide-react";
import { cookies } from "next/headers"
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ShowPassword {
  [key: number]: boolean;
}

interface ILogin {
  username: string
  password: string
  url: string
}

async function getAllLogins(token: string) {
  const res = await fetch("http://localhost:3000/logins/all", {
    headers: {
      Cookie: `token=${token}`
    }
  })

  return res.json();
}

export default async function IndexPage() {
  const cookieStore = cookies()
  const loginData = getAllLogins(cookieStore.get("token")?.value || "")

  const [logins] = await Promise.all([loginData])

  let isBentoEnabled;
  if (typeof window !== 'undefined') {
    isBentoEnabled = JSON.parse(`${localStorage.getItem("bentoGrid")}`)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [showPassword, setShowPassword] = useState<ShowPassword>({})

  const toggleShowPassword = (id: any) => {
    setShowPassword((prevState) => ({
      ...prevState,
      //@ts-ignore thanks v0
      [id]: !prevState[id],
    }))
  }

  const filteredPasswords = logins.data.filter(
    (pass: ILogin) =>
      pass.url.toLowerCase().includes(searchTerm.toLowerCase()) || pass.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <div className="relative flex-1 md:grow-0 ml-auto mb-6">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search passwords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <div className="overflow-auto">
        {isBentoEnabled ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
            {filteredPasswords.map((n: any, i: number) => (
              <div
                key={n}
                className={cn(
                  "p-1 rounded-lg h-32",
                  i == 2 && "col-span-2",
                  i == 3 && "col-span-2"
                )}
              >
                <Card className="size-full flex items-center justify-center h-full flex-col">
                  <p className="text-xl">{n.url}</p>
                  <p className="text-md mt-6">{n.username}</p>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Website</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Password</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPasswords.map((password: any) => (
                <TableRow key={password.id}>
                  <TableCell>{password.url}</TableCell>
                  <TableCell>{password.username}</TableCell>
                  <TableCell>
                    {showPassword[password.id]
                      ? password.password
                      : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => toggleShowPassword(password.id)}>
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(password.password)}>
                      <Clipboard className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}