USE [master]
GO
/****** Object:  Database [Clima]    Script Date: 20-05-2022 17:47:53 ******/
CREATE DATABASE [Clima]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Clima', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Clima.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Clima_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Clima_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Clima] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Clima].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Clima] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Clima] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Clima] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Clima] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Clima] SET ARITHABORT OFF 
GO
ALTER DATABASE [Clima] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Clima] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Clima] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Clima] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Clima] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Clima] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Clima] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Clima] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Clima] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Clima] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Clima] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Clima] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Clima] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Clima] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Clima] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Clima] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Clima] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Clima] SET RECOVERY FULL 
GO
ALTER DATABASE [Clima] SET  MULTI_USER 
GO
ALTER DATABASE [Clima] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Clima] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Clima] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Clima] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Clima] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Clima] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Clima', N'ON'
GO
ALTER DATABASE [Clima] SET QUERY_STORE = OFF
GO
USE [Clima]
GO
/****** Object:  User [me]    Script Date: 20-05-2022 17:47:53 ******/
CREATE USER [me] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[proceso]    Script Date: 20-05-2022 17:47:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proceso](
	[idProceso] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NOT NULL,
	[clima] [varchar](59) NOT NULL,
	[temperatura] [decimal](18, 0) NOT NULL,
	[humedad] [decimal](18, 0) NOT NULL,
	[fechaProceso] [smalldatetime] NOT NULL,
	[lugar] [varchar](50) NULL,
	[tiempo_de_riego] [time](7) NULL,
	[sector_de_riego] [varchar](50) NULL,
	[calculo_de_agua] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idProceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario]    Script Date: 20-05-2022 17:47:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[userName] [varchar](50) NOT NULL,
	[password] [varchar](20) NOT NULL,
	[nombreUsuario] [varchar](100) NOT NULL,
	[fechaCreacion] [smalldatetime] NOT NULL,
 CONSTRAINT [PK__usuario__645723A639B70269] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[proceso]  WITH CHECK ADD  CONSTRAINT [FK_proceso_usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[proceso] CHECK CONSTRAINT [FK_proceso_usuario]
GO
USE [master]
GO
ALTER DATABASE [Clima] SET  READ_WRITE 
GO
