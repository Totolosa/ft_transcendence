import {
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
	Body,
} from '@nestjs/common';
import { AuthGuard } from '../authentication/auth.guard';
import { ChatService } from './chat.service';
import { NewChanDto } from './dto/NewChanDto';

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@UseGuards(AuthGuard)
	@Get('getPrivs/:login')
	async getPrivs(@Param() params: { login: string }) {
		console.log(`getPrivs for user ${params.login}`);
		const privs = await this.chatService.getUserPrivs(params.login);
		await this.chatService.sortPrivs(privs);
		return await this.chatService.createPrivsDto(params.login, privs);
	}

	@UseGuards(AuthGuard)
	@Get('getChans/:login')
	async getChans(@Param() params : {login: string}) {
		console.log(`getChans for user ${params.login }`);
		const chans = await this.chatService.getUserChans(params.login);
		let chansDto = this.chatService.createChansDto(params.login, chans)
		if (chansDto.length)
			this.chatService.sortChans(chansDto);
		return chansDto
	}

	@UseGuards(AuthGuard)
	@Get('userExistOrBlocked/:login/:requestor')
	async userExist(@Param() params : {login: string, requestor: string}) {
		return this.chatService.userExistOrBlocked(params.login, params.requestor);
	}

	@UseGuards(AuthGuard)
	@Get('chanExist/:chan')
	async chanExist(@Param() params : {chan: string}) {
		return this.chatService.chanExist(params.chan);
	}

	@UseGuards(AuthGuard)
	@Get('invitChanUser/:chan/:login')
	async invitChanUser(@Param() params : {chan:string, login: string}) {
		return this.chatService.invitChanUser(params.chan, params.login);
	}

	@UseGuards(AuthGuard)
	@Get('getServerUsersFiltred/:login/:filter')
	async getServerUsersFiltred(
		@Param() params: { login: string; filter: string },
	) {
		return await this.chatService.getServerUsersFiltred(
			params.login,
			params.filter,
		);
	}

	@UseGuards(AuthGuard)
	@Get('getServerChansFiltred/:login/:filter')
	async getServerChansFiltred(
		@Param() params: { login: string; filter: string },
	) {
		return await this.chatService.getServerChansFiltred(
			params.login,
			params.filter,
		);
	}

	@UseGuards(AuthGuard)
	@Post('createChan')
	async createChan( @Body() data: NewChanDto) {
		return await this.chatService.createNewChan(data);
	}

	@UseGuards(AuthGuard)
	@Post('joinChanRequest')
	async joinChanRequest(
		@Body() data: {requestor: string, chanName: string, psw: string | undefined}
	) {
		return await this.chatService.joinChanRequest(data);
	}

}
