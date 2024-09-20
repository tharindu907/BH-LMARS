import 'package:flutter/material.dart';

class ConfirmationPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Confirmation')),
      body: Center(
        child: Text('Attendance recorded successfully!'),
      ),
    );
  }
}
