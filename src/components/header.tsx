import {
	Avatar,
	AvatarFallback,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui'
import { useCookies } from '@/hooks/useCookies'
import getUserAvatar from '@/lib/get-user-avatar'
import { logout } from '@/lib/logout'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
	const cookies = useCookies()
	const navigate = useNavigate()
	return (
		<div className="px-6 md:px-0">
			<header className="w-full lg:w-2/3 flex h-24 items-center justify-between mx-auto z-10">
				<div className="flex items-center gap-1">
					<span className="text-brand font-semibold text-xl">Plataforma</span>
				</div>
				<div className="flex items-center gap-1">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="flex items-center gap-2 cursor-pointer">
								<Avatar>
									<AvatarFallback>{getUserAvatar(cookies?.email)}</AvatarFallback>
								</Avatar>
								{cookies?.email}
								<ChevronDown size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/my-account')}>
									<User className="mr-2 h-4 w-4" />
									<span>Perfil</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Sair</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</div>
	)
}
