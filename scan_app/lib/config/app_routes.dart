import 'package:flutter/material.dart';
import 'package:scan_app/pages/home_page.dart';
import 'package:scan_app/pages/login_page.dart';
import 'package:scan_app/pages/main_page.dart';
import 'package:scan_app/provider/login_provider.dart';
import 'package:provider/provider.dart';

class AppRoutes {
  static const String login = '/';
  static const String home = '/home';
  static const String main = '/main'; 

  static final Map<String, Widget Function(BuildContext)> pages = {
    login: (context) => ChangeNotifierProvider(
          create: (context) => LoginProvider(),
          child: const LoginPage(),
        ),
    home: (context) => const HomePage(),
    main: (context) => const MainPage(),
  };
}
