import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from Next.js
import { Home, LandPlot, LogOut, Package, PanelBottom, Plane, Plus, Send, SendIcon, Settings, Users } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function Sidebar() {
    return (
        <div className="flex w-full flex-col bg-muted/40">
            {/* Sidebar para telas grandes */}
            <aside className='fixed inset-y-0 left-0 z-10 hidden w-20 border-r bg-background sm:flex flex-col'>
                <nav className='flex flex-col items-center gap-3 px-2 py-5'>
                    <TooltipProvider>
                        {/* Logo */}
                        <Link
                            href={"/"} // Link para a página inicial
                            className='flex h-9 w-14 shrink-0 items-center justify-center mt-5 mb-12'
                        >
                            <Image 
                                src="/images/logos/images-2.png" 
                                alt="Logo" 
                                width={56} 
                                height={56} 
                                className='object-contain' 
                            />
                            <span className='sr-only'>Dashboard Operador</span>
                        </Link>

                        {/* Ícones da Sidebar */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/nova-missao" // Nova missão
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <Plus className='h-7 w-7 bg-black text-white rounded-md' />
                                    <span className='sr-only'>Nova Missão</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Nova Missão</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/" // Home
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <Home className='h-5 w-5' />
                                    <span className='sr-only'>Home</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Home</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/clientes" // Clientes
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <Users className='h-5 w-5' />
                                    <span className='sr-only'>Clientes</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Clientes</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/pedidos" // Pedidos
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <Package className='h-5 w-5' />
                                    <span className='sr-only'>Pedidos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Pedidos</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/missoes" // Drones
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <Send className='h-5 w-5' />
                                    <span className='sr-only'>Missões</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Missões</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/drones" // Drones
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <Plane className='h-5 w-5' />
                                    <span className='sr-only'>Drones</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Drones</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/infraestrutura" // Drones
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <LandPlot className='h-5 w-5' />
                                    <span className='sr-only'>Infraestrutura</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Infraestrutura</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/configuracoes" // Configurações
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <Settings className='h-5 w-5' />
                                    <span className='sr-only'>Configurações</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Configurações</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>

                {/* Seção para sair */}
                <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-5'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/sair" // Sair
                                    className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
                                >
                                    <LogOut className='h-5 w-5' />
                                    <span className='sr-only'>Sair</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right'>Sair</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

            {/* Sidebar para telas pequenas */}
            <div className="sm:hidden flex flex-col">
                <header className='sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
                    <Image 
                        src="/images/logos/images-2.png" 
                        alt="Logo" 
                        width={60} 
                        height={60} 
                        className='object-contain h-10 w-10' 
                    />
                    <h2 className="ml-auto">Menu</h2>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className='sm:hidden'>
                                <PanelBottom className='w-5 h-5' />
                                <span className='sr-only'> Abrir ou fechar menu </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className='sm:max-w-x bg-white'>
                            <nav className='grid gap-6 text-lg font-medium'>
                                {/* Links do menu */}
                                <Link
                                    href="/nova-missao" // Nova Missão
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <Plus className='h-5 w-5 transition-all' />
                                    Nova Missão
                                </Link>

                                <Link
                                    href="/" // Home
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <Home className='h-5 w-5 transition-all' />
                                    Home
                                </Link>

                                <Link
                                    href="/clientes" // Clientes
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <Users className='h-5 w-5 transition-all' />
                                    Clientes
                                </Link>

                                <Link
                                    href="/pedidos" // Pedidos
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <Package className='h-5 w-5 transition-all' />
                                    Pedidos
                                </Link>

                                <Link
                                    href="/missoes" // Produtos (se houver uma página de produtos)
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <SendIcon className='h-5 w-5 transition-all' />
                                    Missões
                                </Link>

                                <Link
                                    href="/produtos" // Produtos (se houver uma página de produtos)
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <Plane className='h-5 w-5 transition-all' />
                                    Drones
                                </Link>

                                <Link
                                    href="/infraestrutura" // Produtos (se houver uma página de produtos)
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <LandPlot className='h-5 w-5 transition-all' />
                                    Infraestrutura
                                </Link>


                                <Link
                                    href="/configuracoes" // Configurações
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <Settings className='h-5 w-5 transition-all' />
                                    Configurações
                                </Link>


                                <Link
                                    href="/sair" // Sair
                                    className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                                    prefetch={false}
                                >
                                    <LogOut className='h-5 w-5 transition-all' />
                                    Sair
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
            </div>
        </div>
    );
}
