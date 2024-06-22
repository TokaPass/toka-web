import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Activity,
  Users2,
  Book,
  Cuboid,
  Lock,
  Clipboard,
  Eye
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@radix-ui/react-dialog"
import { GetServerSidePropsContext } from "next"
import Layout from "@/components/layout"

interface ShowPassword {
  [key: number]: boolean;
}

export default function Dashboard({ data }: any) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showPassword, setShowPassword] = useState<ShowPassword>({})

  const toggleShowPassword = (id: any) => {
    setShowPassword((prevState) => ({
      ...prevState,
      //@ts-ignore thanks v0
      [id]: !prevState[id],
    }))
  }
  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Layout>
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
            {data.data.map((password: any) => (
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
      </div>
    </Layout>
  )
}

// Idk why this shit dont works
/*
Dashboard.getLayout = function (page: React.ReactNode) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
*/
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const headers: { [token: string]: string } = {};

  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie;
  }

  const res = await fetch("http://localhost:3000/logins/all", {
    method: 'GET',
    headers
  })

  const data = await res.json()

  return {
    props: {
      data
    }
  }
}