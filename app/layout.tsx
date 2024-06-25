import "@/styles/globals.css"
import { ThemeProvider } from "@/components/ThemeProvider";
import Image from "next/image"
import Link from "next/link"
import {
  Home,
  Package2,
  PanelLeft,
  Settings,
  Book,
  Cuboid,
  CopyIcon,
} from "lucide-react"
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
  DropdownMenu,
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@radix-ui/react-dialog"
import { Separator } from "@/components/ui/separator"
import { generateSillyPassword } from "silly-password-generator"
import { generatePassword } from "@/lib/password"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { headers } from "next/headers";

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const headerList = headers()
  const fullUrl = headerList.get('referer') || "";
  const path = new URL(fullUrl).pathname

  const [newPass, setNewPass] = useState<any>({})

  const [length, setLenght] = useState([8])
  const [uppercase, setUppercase] = useState<boolean | 'indeterminate'>(true);
  const [lowercase, setLowercase] = useState<boolean | 'indeterminate'>(false)
  const [num, setNum] = useState<boolean | 'indeterminate'>(true)
  const [symbols, setSymbols] = useState<boolean | 'indeterminate'>(true)
  const [generatedPass, setGeneratedPass] = useState("")

  const [funMode, setFunMode] = useState(false)
  const [funCapitalize, setFunCapitalize] = useState<boolean | 'indeterminate'>(false)

  const generatePasswordWithOptions = () => {
    if (funMode) {
      return setGeneratedPass(generateSillyPassword({ wordCount: length[0], capitalize: funCapitalize as boolean }))
    } else {
      setGeneratedPass(generatePassword(length[0], uppercase as boolean, lowercase as boolean, num as boolean, symbols as boolean))
    }
  }

  async function createLogin(formData: FormData) {
    'use server'
    const rawFormData = {
      url: formData.get("url"),
      username: formData.get("username"),
      password: formData.get("password"),
    }

    if (!rawFormData.password || !rawFormData.username || !rawFormData.url) {
      alert("Please fill all fields")
      return
    }

    await fetch("http://localhost:3001/api/logins/create", {
      method: "POST",
      body: JSON.stringify(rawFormData),
    })
  }

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
              <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                  <Link
                    href="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <Cuboid className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Toka</span>
                  </Link>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/"
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${path === "/" ? "bg-accent" : ""} text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                        >
                          <Home className="h-5 w-5" />
                          <span className="sr-only">Dashboard</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/generator"
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${path === "/generator" ? "bg-accent" : ""} text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                        >
                          <Book className="h-5 w-5" />
                          <span className="sr-only">Generator</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Generator</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/settings"
                          className={`flex h-9 ${path === "/settings" ? "bg-accent" : ""} w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                        >
                          <Settings className="h-5 w-5" />
                          <span className="sr-only">Settings</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </nav>
              </aside>
              <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                      <nav className="grid gap-6 text-lg font-medium">
                        <Link
                          href="/"
                          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                          <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                          <span className="sr-only">Toka</span>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                          <Home className="h-5 w-5" />
                          Dashboard
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                          <Book className="h-5 w-5" />
                          Passwords
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="/">Dashboard</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <BreadcrumbPage>General</BreadcrumbPage>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          Add Login
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add new Login</DialogTitle>
                          <DialogDescription>
                            Fill inputs and Click save when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <form action={createLogin}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Username
                              </Label>
                              <Input
                                id="username"
                                className="col-span-3"
                                required
                                onChange={(e) => setNewPass({ ...newPass, username: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="password" className="text-right">
                                Password
                              </Label>
                              <Input
                                id="password"
                                className="col-span-3"
                                required
                                onChange={(e) => setNewPass({ ...newPass, password: e.target.value })}
                                value={newPass.password}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="website" className="text-right">
                                Website
                              </Label>
                              <Input
                                id="website"
                                className="col-span-3"
                                required
                                onChange={(e) => setNewPass({ ...newPass, url: e.target.value })}
                              />
                            </div>

                            {newPass.password ? (
                              <></>
                            ) : (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Sheet>
                                  <SheetTrigger className="w-full col-span-4">
                                    <Button>Password Generator</Button>
                                  </SheetTrigger>
                                  <SheetContent className="w-[800px] sm:w-[540px]">
                                    <SheetHeader>
                                      <SheetTitle>Password generator</SheetTitle>
                                      <SheetDescription>
                                        Change options to generate different passwords

                                        <Separator className="mt-4 mb-4" />

                                        <div className="grid gap-4">
                                          <div className="flex items-center space-x-2">
                                            <Switch id="funmode" checked={funMode} onCheckedChange={(newVal) => setFunMode(newVal)} />
                                            <Label htmlFor="funmode">Fun mode</Label>
                                          </div>
                                          <Card>
                                            <CardContent className="grid gap-4">
                                              <div className="grid gap-2 mt-4">
                                                <Label htmlFor="length">Length</Label>
                                                <Slider id="length" min={8} max={32} defaultValue={[16]} step={1} onValueChange={(newVal) => setLenght(newVal)} />
                                              </div>
                                              <div className="grid gap-2">
                                                {funMode ? (
                                                  <Label className="flex items-center gap-2">
                                                    <Checkbox id="include-uppercase" checked={funCapitalize} onCheckedChange={(newVal) => setFunCapitalize(newVal)} />
                                                    Capitalize
                                                  </Label>
                                                ) : (
                                                  <div className="grid gap-2">
                                                    <Label className="flex items-center gap-2">
                                                      <Checkbox id="include-uppercase" checked={uppercase} onCheckedChange={(newVal) => setUppercase(newVal)} />
                                                      Include Uppercase
                                                    </Label>
                                                    <Label className="flex items-center gap-2">
                                                      <Checkbox id="include-lowercase" checked={lowercase} onCheckedChange={(newVal) => setLowercase(newVal)} />
                                                      Include Lowercase
                                                    </Label>
                                                    <Label className="flex items-center gap-2">
                                                      <Checkbox id="include-numbers" checked={num} onCheckedChange={(newVal) => setNum(newVal)} />
                                                      Include Numbers
                                                    </Label>
                                                    <Label className="flex items-center gap-2">
                                                      <Checkbox id="include-symbols" checked={symbols} onCheckedChange={(newVal) => setSymbols(newVal)} />
                                                      Include Symbols
                                                    </Label>
                                                  </div>
                                                )}
                                              </div>
                                              <div className="grid gap-2">
                                                <Label htmlFor="password">Generated Password</Label>
                                                <div className="flex items-center gap-2">
                                                  <Input id="password" readOnly value={generatedPass} />
                                                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                                                    <CopyIcon className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </div>

                                        <div className="mt-4">
                                          <Button onClick={() => generatePasswordWithOptions()}>Generate</Button>
                                          <Button onClick={() => setNewPass({ ...newPass, password: generatedPass })} variant="secondary" className="ml-4">
                                            Use this password
                                          </Button>
                                        </div>
                                      </SheetDescription>
                                    </SheetHeader>
                                  </SheetContent>
                                </Sheet>
                              </div>
                            )}
                          </div>
                        </form>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="submit">Save changes</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                      >
                        <Image
                          src="https://github.com/emirsassan.png"
                          width={36}
                          height={36}
                          alt="Avatar"
                          className="overflow-hidden rounded-full"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </header>
                <div className="flex flex-col text-foreground overflow-y-auto">
                  <main className="flex-1 p-6">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}